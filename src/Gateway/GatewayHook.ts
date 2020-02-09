export default interface GatewayHook {
  // Receive request from Gateway port
  gatewayRequest(requestData: {id: string, data?: any}): Promise<any>;

  // Transmit to public channel
  gatewayOutput(data: any): Promise<any>;

}
