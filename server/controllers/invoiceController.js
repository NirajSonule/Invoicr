import Invoice from "../models/invoice.js";

const getInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllInvoice = async (req, res) => {
  const userId = req.user._id;

  try {
    const invoices = await Invoice.find({ userId });
    res.status(200).json({ success: true, invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const createInvoice = async (req, res) => {
  const userId = req.user._id;
  const { clientId, items, taxRate, total, dueDate, status } = req.body;

  try {
    if (!items || !taxRate || !total || !dueDate || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const newInvoice = new Invoice({
      userId,
      clientId,
      items,
      taxRate,
      total,
      dueDate,
      status,
    });
    await newInvoice.save();

    res
      .status(201)
      .json({ success: true, message: "Invoice created Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const { items, taxRate, total, dueDate, status } = req.body;

  try {
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    invoice.items = items !== undefined ? items : invoice.items;
    invoice.taxRate = taxRate !== undefined ? taxRate : invoice.taxRate;
    invoice.total = total !== undefined ? total : invoice.total;
    invoice.dueDate = dueDate !== undefined ? dueDate : invoice.dueDate;
    invoice.status = status !== undefined ? status : invoice.status;

    await invoice.save();

    res
      .status(200)
      .json({ success: true, message: "Invoice updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    await Invoice.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  getInvoice,
  getAllInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
