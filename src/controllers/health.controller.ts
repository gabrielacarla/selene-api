export class HealthController {
  index(req, res) {
    return res.json({
      message: "Selene API is running ⏾",
    });
  }
}