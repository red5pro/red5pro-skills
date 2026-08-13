_From: Stream Manager 2.0 Curl Cheat Sheet_

## Upload a new image

``` 
curl -s \
  -H "Authorization: Bearer ${JWT}" \
  -X POST \
  -F "file=@Red5b.png" \
  "https://as-test1.example.org/as/v1/streams/images/allinone-oci-1?host=192.168.1.100"
```
