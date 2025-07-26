
import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { executeTool } from "./buildship/execute-tool.js";
import { z } from "zod";

const server = new McpServer({ name: "revenueCatTelegramNotifier", version: "1.0.0" });
server.tool("", "", { event: z.object({}).default({"presented_offering_id":null,"entitlement_id":null,"aliases":["24fcddf0-8047-40d1-b679-fbd180e86bf1","911770fc-40ba-4a1a-9647-45050b8411d0"],"transaction_id":null,"country_code":"US","store":"APP_STORE","renewal_number":null,"is_family_share":null,"commission_percentage":null,"entitlement_ids":null,"type":"TEST","original_app_user_id":"24fcddf0-8047-40d1-b679-fbd180e86bf1","takehome_percentage":null,"period_type":"NORMAL","environment":"SANDBOX","purchased_at_ms":"1753507877660","original_transaction_id":null,"price_in_purchased_currency":null,"event_timestamp_ms":"1753507877660","id":"956A0D7D-0ADC-4B98-82FF-BD94A8845BB6","app_id":"app5830608bd1","tax_percentage":null,"product_id":"test_product","metadata":null,"expiration_at_ms":"1753515077660","offer_code":null,"price":null,"app_user_id":"24fcddf0-8047-40d1-b679-fbd180e86bf1","subscriber_attributes":{"$displayName":{"updated_at_ms":"1753507877660","value":"Mister Mistoffelees"},"my_custom_attribute_1":{"updated_at_ms":"1753507877660","value":"catnip"},"$phoneNumber":{"value":"+19795551234","updated_at_ms":"1753507877660"},"$email":{"value":"tuxedo@revenuecat.com","updated_at_ms":"1753507877660"}},"currency":null}) }, async (inputs) => { return await executeTool("revenueCatTelegramNotifier", inputs); });


const transport = new StdioServerTransport();
await server.connect(transport);
