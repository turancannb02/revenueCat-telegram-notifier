import execute from "./index.js";

const testEvent = {
  event: {
    app_user_id: "user_test_123",
    product_id: "com.test.premium",
    purchased_at_ms: Date.now(),
    type: "TRIAL_STARTED",
    country_code: "US"
  }
};


execute(testEvent, {}).then(() => {
  console.log("Test finished.");
}).catch((err) => {
  console.error("Error during execution:", err);
});
