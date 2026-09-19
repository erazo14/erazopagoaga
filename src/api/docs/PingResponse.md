
# PingResponse


## Properties

Name | Type
------------ | -------------
`greeting` | string
`date` | string
`url` | string
`headers` | [PingResponseHeaders](PingResponseHeaders.md)

## Example

```typescript
import type { PingResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "greeting": null,
  "date": null,
  "url": null,
  "headers": null,
} satisfies PingResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PingResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


