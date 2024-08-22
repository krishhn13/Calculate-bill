// Sample Data
const items = [
  {
    id: "item1",
    itemName: "Butter Roti",
    rate: 20,
    taxes: [
      {
        name: "Service Charge",
        rate: 10,
        isInPercent: "Y"
      }
    ],
    category: {
      categoryId: "C2"
    }
  },
  {
    id: "item2",
    itemName: "Paneer Butter Masala",
    rate: 150,
    taxes: [
      {
        name: "Service Charge",
        rate: 10,
        isInPercent: "Y"
      }
    ],
    category: {
      categoryId: "C1"
    }
  }
];

const categories = [
  {
    id: "C1",
    categoryName: "Platters",
    superCategory: {
      superCategoryName: "South Indian",
      id: "SC1"
    }
  },
  {
    id: "C2",
    categoryName: "Breads",
    superCategory: {
      superCategoryName: "North Indian",
      id: "SC2"
    }
  }
];

const bill = {
  id: "B1",
  billNumber: 1,
  opentime: "06 Nov 2020 14:19",
  customerName: "CodeQuotient",
  billItems: [
    {
      id: "item2",
      quantity: 3,
      discount: {
        rate: 10,
        isInPercent: "Y"
      }
    }
  ]
};

// Helper function to find an item by its ID
const findItemById = (itemId) => items.find((item) => item.id === itemId);

// Helper function to find a category by its ID
const findCategoryById = (categoryId) =>
  categories.find((category) => category.id === categoryId);

// Task 1: Return JSON structure without calculations
function generateBillSummary(bill) {
  const billItems = bill.billItems.map((billItem) => {
    const item = findItemById(billItem.id);
    return {
      id: billItem.id,
      name: item.itemName,
      quantity: billItem.quantity
    };
  });

  return {
    id: bill.id,
    billNumber: bill.billNumber,
    opentime: bill.opentime,
    customerName: bill.customerName,
    billItems: billItems
  };
}

// Task 2: Return JSON structure with calculations (including taxes, discounts, etc.)
function generateDetailedBill(bill) {
  let totalAmount = 0;

  const billItems = bill.billItems.map((billItem) => {
    const item = findItemById(billItem.id);
    const category = findCategoryById(item.category.categoryId);

    // Calculate the base amount
    let amount = item.rate * billItem.quantity;

    // Apply discount if applicable
    if (billItem.discount) {
      const discountRate = billItem.discount.rate;
      if (billItem.discount.isInPercent === "Y") {
        amount -= (amount * discountRate) / 100;
      } else {
        amount -= discountRate;
      }
    }

    // Apply taxes if applicable
    item.taxes.forEach((tax) => {
      if (tax.isInPercent === "Y") {
        amount += (amount * tax.rate) / 100;
      } else {
        amount += tax.rate;
      }
    });

    // Accumulate the total amount
    totalAmount += amount;

    return {
      id: billItem.id,
      name: item.itemName,
      quantity: billItem.quantity,
      discount: billItem.discount,
      taxes: item.taxes,
      amount: amount.toFixed(2), // Amount rounded to 2 decimal places
      superCategoryName: category.superCategory.superCategoryName,
      categoryName: category.categoryName
    };
  });

  return {
    id: bill.id,
    billNumber: bill.billNumber,
    opentime: bill.opentime,
    customerName: bill.customerName,
    billItems: billItems,
    totalAmount: totalAmount.toFixed(2) // Total amount rounded to 2 decimal places
  };
}

// Output the results
console.log("Task 1 - Bill Summary:", generateBillSummary(bill));
console.log("Task 2 - Detailed Bill:", generateDetailedBill(bill));
