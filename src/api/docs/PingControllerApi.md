# PingControllerApi

All URIs are relative to *https://api.erazopagoaga.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**pingControllerPing**](PingControllerApi.md#pingcontrollerping) | **GET** /ping |  |



## pingControllerPing

> PingResponse pingControllerPing()



### Example

```ts
import {
  Configuration,
  PingControllerApi,
} from '';
import type { PingControllerPingRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PingControllerApi();

  try {
    const data = await api.pingControllerPing();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**PingResponse**](PingResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Ping Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

