import request from "supertest";
import app from "../server"; // Assure-toi que `server.ts` exporte `app`
import { AuthService } from "../services/auth.service";

jest.mock("../services/auth.service");

describe("Auth Controller", () => {
  let authService: jest.Mocked<AuthService>;

  beforeEach(() => {
    authService = new AuthService() as jest.Mocked<AuthService>;
  });

  it("should register a user", async () => {
    const mockUser = {
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      password : "password",
      email: "jean@example.com",
      isAdmin: false,
      isLoggedIn: false,
    };

    authService.register.mockResolvedValue(mockUser);

    const response = await request(app)
      .post("/auth/register")
      .send({
        nom: "Dupont",
        prenom: "Jean",
        email: "jean@example.com",
        password: "password123",
      });

    expect(response.status).toBe(201);
    expect(response.body.user).toEqual(mockUser);
  });

  it("should login a user", async () => {
    const mockUser = {
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      password: "password",
      email: "jean@example.com",
      isAdmin: false,
      isLoggedIn: true,
    };

    authService.login.mockResolvedValue({
      token: "mockToken",
      user: mockUser,
    });

    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "jean@example.com",
        password: "password123",
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe("mockToken");
    expect(response.body.user).toEqual(mockUser);
  });

  it("should logout a user", async () => {
    authService.logout.mockResolvedValue();

    const response = await request(app)
      .post("/auth/logout")
      .set("Authorization", "Bearer mockToken");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User logged out successfully");
  });
});
