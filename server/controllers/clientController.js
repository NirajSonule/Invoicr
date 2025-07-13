import Client from "../models/client.js";

const getClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findOne({ _id: id, userId: req.user._id });
    if (!client) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    res.status(200).json({ success: true, client });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllClient = async (req, res) => {
  const userId = req.user._id;

  try {
    const clients = await Client.find({ userId });

    res.status(200).json({ success: true, clients });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createClient = async (req, res) => {
  const userId = req.user._id;
  const { clientName, email, address } = req.body;

  try {
    if (!clientName || !email || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const existingClient = await Client.findOne({
      clientName,
      userId: req.user._id,
    });
    if (existingClient) {
      return res
        .status(409)
        .json({ success: false, message: "Client already exists" });
    }

    const newClient = new Client({ userId, clientName, email, address });
    await newClient.save();

    res.status(201).json({
      success: true,
      message: "Client created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  const { clientName, email, address } = req.body;

  try {
    if (!clientName || !email || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const client = await Client.findOne({ _id: id, userId: req.user._id });
    if (!client) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    client.clientName =
      clientName !== undefined ? clientName : client.clientName;
    client.email = email !== undefined ? email : client.email;
    client.address = address !== undefined ? address : client.address;

    await client.save();

    res.status(200).json({
      success: true,
      message: "Client updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    await Client.deleteOne({ _id: id, userId: req.user._id });
    res
      .status(200)
      .json({ success: true, message: "client deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { getClient, getAllClient, createClient, updateClient, deleteClient };
