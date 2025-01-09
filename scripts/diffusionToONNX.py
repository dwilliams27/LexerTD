from diffusers import StableDiffusionPipeline
import torch
from pathlib import Path
import sys

# Load pipeline
pipeline = StableDiffusionPipeline.from_pretrained(sys.argv[1])

# Create output directory
output_dir = Path("./onnx")
output_dir.mkdir(exist_ok=True, parents=True)

# Make directories for each component
(output_dir / "text_encoder").mkdir(exist_ok=True)
(output_dir / "unet").mkdir(exist_ok=True)

# Prepare dummy inputs
dummy_text_input = torch.ones((1, 77), dtype=torch.int64)
dummy_latent = torch.randn((1, 4, 64, 64))
dummy_timestep = torch.ones((1,))
dummy_encoder_hidden_states = torch.randn((1, 77, 768))

# Export text encoder
torch.onnx.export(
    pipeline.text_encoder,
    dummy_text_input,
    str(output_dir / "text_encoder/model.onnx"),
    input_names=['input_ids'],
    output_names=['last_hidden_state', 'pooler_output'],
    dynamic_axes={
        'input_ids': {0: 'batch', 1: 'sequence'},
    },
    opset_version=14
)

# Export UNet
torch.onnx.export(
    pipeline.unet,
    (dummy_latent, dummy_timestep, dummy_encoder_hidden_states),
    str(output_dir / "unet/model.onnx"),
    input_names=['sample', 'timestep', 'encoder_hidden_states'],
    output_names=['noise_pred'],
    dynamic_axes={
        'sample': {0: 'batch', 2: 'height', 3: 'width'},
        'encoder_hidden_states': {0: 'batch', 1: 'sequence'},
    },
    opset_version=14
)
