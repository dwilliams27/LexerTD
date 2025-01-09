from diffusers.pipelines.stable_diffusion.convert_from_ckpt import download_from_original_stable_diffusion_ckpt
import sys

pipeline = download_from_original_stable_diffusion_ckpt(
    sys.argv[1],
    from_safetensors=True,
    load_safety_checker=False
)

pipeline.save_pretrained("./diffusers_model")
