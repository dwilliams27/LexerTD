# LexerTD

## Model setup
Need to convert [Aziibpixelmix](https://civitai.com/models/195730/aziibpixelmix) to ONNX

1. Download Stable Diffusion 1.5 ONNX
2. Download https://civitai.com/models/195730/aziibpixelmix (fientuned for pixel art)
3. Convert aziibpixelmix.safetensors to diffusion format via `scripts/safetensorsToDiffusion.py`
4. Convert just unet and text_encoder to ONNX via `scripts/diffusionToONNX.py`
5. Merge output of 4 with SD 1.5 ONNX

For LLM just download [Qwen2.5-0.5B ONNX directly](https://huggingface.co/onnx-community/Qwen2.5-0.5B-Instruct/tree/main).
Use model_fp16.onnx
