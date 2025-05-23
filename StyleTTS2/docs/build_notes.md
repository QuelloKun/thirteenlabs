# Build Notes

```bash
# build docker with env vars
docker build --build-arg AWS_REGION=$AWS_REGION \
            --build-arg S3_BUCKET=$S3_BUCKET \
            --build-arg S3_PREFIX=$S3_PREFIX \
            --build-arg API_KEY=$API_KEY \
            --build-arg CONFIG_PATH=$CONFIG_PATH \
            --build-arg MODEL_PATH=$MODEL_PATH \
            -t your-image-name .
```