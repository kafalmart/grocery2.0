import * as adminService from "../services/admin.service.js";

export const getDashboard =
  async (req , res) => {
    try {
      const data =
        await adminService.getDashboardData();

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getUsers =
  async (req, res) => {
    try {
      const users =
        await adminService.getAllUsers();

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      }
    );
    }
  };

export const getUser =
  async (req, res) => {
    try {
      const user =
        await adminService.getUserById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  };