const { subDays, startOfDay, endOfDay } = require("date-fns");
const cron = require("node-cron");
const { ConnectionRequest } = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");

// This job will run at 8 AM in the morning everyday
cron.schedule("0 8 * * *", async () => {
  console.log(`Running daily email job for ${new Date().toDateString()}`);
  // Send emails to all people who got requests the previous day
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);
    const connectionRequests = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");
    const emails = [
      ...new Set(connectionRequests.map((cr) => cr.toUserId.emailId)),
    ];
    console.log(emails);
    for (const email of emails) {
      const subject = "Pending Connection Requests for " + email;
      const body =
        "There are pending requests for " +
        email +
        ". Please accept or reject them from DevTinder.";
      try {
        const emailRes = await sendEmail.run(subject, body);
        console.log(emailRes);
      } catch (emailErr) {
        console.error("Failed to send email to " + email + ":", emailErr.message);
      }
    }
  } catch (err) {
    console.log(err);
  }
});
