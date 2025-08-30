// export newtrasnaction(){
//     try {
//         const { userId, amount, type } = req.body;
//         const transaction = new transactionModel({ userId, amount, type });
//         await transaction.save();
//         res.status(200).json({ message: "Transaction Successful", transaction });
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     };
// }