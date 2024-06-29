# Cloudflare R2 Loki Integration 🌩️

> Integrate Loki with Cloudflare R2 for storage purposes.

## Running

### Creating bucket and tokens

First you need to create a bucket in [Cloudflare dashboard](https://dash.cloudflare.com/). Next step is to generate an API token to serve as the Access Key for usage with existing S3-compatible SDKs or XML APIs, in our case Loki.

[Here you can find an article in Cloudflare docs about how to create the tokens.](https://developers.cloudflare.com/r2/api/s3/tokens/)

### Creating env file and Loki file

Now that you have your bucket created and the API Tokens to access it is time to
create your `.env` file that will be used to generate you `loki-config.yaml` file:

```shell
cp .env.example .env
```

Change the content of you `.env` file with yours:

```shell
R2_BUCKET=<your-bucket-name>
R2_REGION=auto
R2_ENDPOINT=https://<your-account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY=<your-access-key>
R2_SECRET_KEY=<your-secret-key>
```

Now run the command bellow to create the `loki-config.yaml` in your project root:

```shell
node bin/generate r2
```

### Running Loki and pushing to it

To run Loki you can use Loki CLI or Docker, in this tutorial we are going to use Docker:

```shell
docker run --name loki -d -v $(pwd):/mnt/config -p 3100:3100 grafana/loki:3.0.0 -config.file=/mnt/config/loki-config.yaml
```

To push logs to it you can use the logger setup in this project:

```shell
node bin/log
```

Or you can make API requests directly to Loki:

```shell
curl --request POST \
  --url http://localhost:3100/loki/api/v1/push \
  --header 'Content-Type: application/json' \
  --data '{
  "streams": [
    {
      "stream": {
        "service": "d1"
      },
      "values": [
          [ "1719655895000000000", "hello world!" ],
          [ "1719655895000000000", "hello world!" ]
      ]
    }
  ]
}
'
```

### Querying logs from Loki

To query logs from Loki you can make an API request with the LogQL query in query params:

```shell
curl --request GET \
  --url 'http://localhost:3100/loki/api/v1/query?query=%7Bservice%3D%22d1%22%7D'
```

## Saving logs to filesystem

If you just want to test out Loki without Cloudflare R2 use the `filesystem` template instead:

```shell
node bin/generate filesystem
```
