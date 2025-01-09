import torch
from transformers import AutoModelForCausalLM
import os

def convert_llm_to_onnx(model_path, output_path):
    # Check if MPS is available
    if torch.backends.mps.is_available():
        device = torch.device("mps")
    else:
        device = torch.device("cpu")
    
    print(f"Using device: {device}")
    
    # Load model from local directory
    model = AutoModelForCausalLM.from_pretrained(
        model_path,
        local_files_only=True,
        torch_dtype=torch.float16,
        device_map="mps"  # For M2 Mac
    )
    
    # Move dummy tensors to the same device as model
    dummy_input_ids = torch.zeros(1, 32, dtype=torch.long, device=device)
    dummy_attention_mask = torch.ones(1, 32, dtype=torch.long, device=device)
    
    # Create dynamic axes for variable sequence length
    dynamic_axes = {
        'input_ids': {0: 'batch', 1: 'sequence'},
        'attention_mask': {0: 'batch', 1: 'sequence'},
        'output': {0: 'batch', 1: 'sequence'}
    }
    
    # Move model to CPU for ONNX export
    model = model.to('cpu')
    dummy_input_ids = dummy_input_ids.to('cpu')
    dummy_attention_mask = dummy_attention_mask.to('cpu')
    
    print("Starting ONNX export...")
    # Export to ONNX
    torch.onnx.export(
        model,
        (dummy_input_ids, dummy_attention_mask),
        output_path,
        input_names=['input_ids', 'attention_mask'],
        output_names=['output'],
        dynamic_axes=dynamic_axes,
        opset_version=15,
        do_constant_folding=True
    )
    print(f"ONNX model saved to {output_path}")

if __name__ == "__main__":
    convert_llm_to_onnx(
        "Qwen2.5-0.5B",
        "result/llm.onnx"
    )
