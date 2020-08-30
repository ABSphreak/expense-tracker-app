const Transaction = require("../models/Transaction");

// @desc      Get all transactions
// @route     GET /api/v1/transactions
// @access    PUBLIC
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      sucess: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    console.log(`Server Error: ${err}`.red);
    return res.status(500).json({
      success: false,
      error: `Server Error: ${err}`,
    });
  }
};

// @desc      Add a transactions
// @route     POST /api/v1/transactions
// @access    PUBLIC
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    console.log(`Server Error: ${err}`.red);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: `Server Error: ${err}`,
      });
    }
  }
};

// @desc      Delete a transaction
// @route     GET /api/v1/transactions/:id
// @access    PUBLIC
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }
    await transaction.remove();
    return res.status(200).json({
      sucess: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: `Server Error: ${err}`,
    });
  }
};
