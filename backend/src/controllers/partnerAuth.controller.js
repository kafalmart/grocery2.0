import Partner from "../models/Partner.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =========================
   Partner Login
========================= */
export const loginPartner = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone and password are required",
      });
    }

    const partner = await Partner.findOne({ phone });

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Partner not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      partner.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: partner._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      partner: {
        _id: partner._id,
        name: partner.name,
        phone: partner.phone,
        isAvailable: partner.isAvailable,
        isOnline: partner.isOnline,
        earnings: partner.earnings,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   Partner Profile
========================= */
export const getPartnerProfile = async (req, res) => {
  try {
    const partner = await Partner.findById(req.user._id).select("-password");

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Partner not found",
      });
    }

    res.status(200).json({
      success: true,
      partner,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
