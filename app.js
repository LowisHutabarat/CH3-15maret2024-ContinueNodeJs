const fs = require("fs");
const express = require('express');

const app = express();
const PORT = 8000;

//middleware untuk membaca json dari request body ke kita
app.use(express.json())


const customers = JSON.parse(fs.readFileSync(`${__dirname}/Data/dummy.json`));


const defaultRouter = (req, res, next) => {
    res.send("<h1>Hello World</h1>");
};

const lengthData = (req, res, next) => {
    res.status(200).json({
        status: "success",
        totalData: customers.length,
        Data: {
            customers,
        },
    });
};


const getCustomerById = (req, res, next) => {
    const id = req.params.id;
    const customer = customers.find(cust => cust._id === id);

    if (!customer) {
        return res.status(404).json({
            status: "failed",
            message: `Customer dengan ID : ${id} tidak ditemukan`,
        });
    }

    res.status(200).json({
        status: "success",
        Data: {
            customer,
        },
    });
}

const updateData =  (req, res, next) => {
    const id = req.params.id;
    const customer = customers.find(cust => cust._id === id);

    if (!customer) {
        return res.status(404).json({
            status: "failed",
            message: `Customer dengan ID : ${id} tidak ditemukan`,
        });
    }

    res.status(200).json({
        status: "success",
        Data: {
            customer,
        },
    });
}

const deleteData = (req, res) => {
    const id = req.params.id;

    console.log("Deleting customer with ID:", id);

    const customerIndex = customers.findIndex(cust => cust._id === id);

    if (customerIndex === -1) {
        console.log("Customer not found with ID:", id);
        return res.status(404).json({
            status: "failed",
            message: `Customer dengan ID : ${id} tidak ditemukan`,
        });
    }

    // Logging customers array before deletion
    console.log("Customers array before deletion:", customers);

    // Deleting customer from array using splice
    customers.splice(customerIndex, 1);

    // Logging customers array after deletion
    console.log("Customers array after deletion:", customers);

    // Writing updated data back to file
    fs.writeFile(`${__dirname}/Data/dummy.json`, JSON.stringify(customers), (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).json({
                status: "error",
                message: "Gagal menyimpan data",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Berhasil menghapus data",
            data: null
        });
    });
}

const newData =  (req, res) => {
    const newCustomer = req.body;
    customers.push(newCustomer);

    fs.writeFile(`${__dirname}/Data/dummy.json`, JSON.stringify(customers), (err) => {
        if (err) {
            return res.status(500).json({
                status: "failed",
                message: "Gagal menyimpan data cuy",
            });
        }

        res.status(201).json({
            status: 'success',
            data: {
                customer: newCustomer,
            },
        });
    });
}

app.get('/', defaultRouter );
// banyak data
app.route('/api/v1/customers').get(lengthData).post(newData);

app
.route('/api/v1/customers/:id')
.get(getCustomerById)
.patch(updateData)
.delete( deleteData);


app.listen(PORT, () => {
    console.log(`APP RUNNING ON PORT : ${PORT}`);
});
