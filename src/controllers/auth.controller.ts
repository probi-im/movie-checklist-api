import { Request, Response } from "express";
import { login, register } from "../services/auth.service";

export async function registerHandler(request: Request, response: Response) {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(500).json({
      message: 'Missing email or password field(s)'
    })
  }
  try {
    const data = await register(email, password);
    return response.status(201).json(data)
  } catch (error) {
    return response.status(400).json({
      message: error.message,
      data: null
    })
  }
}

export async function loginHandler(request: Request, response: Response) {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(500).json({
      message: 'Missing email or password field(s)'
    })
  }
  try {
    const data = await login(email, password);
    return response.status(201).json(data)
  } catch (error) {
    return response.status(400).json({
      message: error.message,
      data: null
    })
  }
}