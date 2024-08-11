const xlsx = require('xlsx');

export const insertData = async(req : any , res : any) => {
    try {
        const {dburl , table} = req.body;
        const workbook = xlsx.read(req.file.buffer , {type : 'buffer'});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet)
        const myobj = [{}];
        const size = Object.keys(data[0]).length;

        for(let i = 1 ; i < data.length - 1 ; i++){
            myobj.push({});
        }

        for(let i = 1 ; i < data.length ; i++){
            const size = Object.keys(data[i]).length;
            for(let j = 1 ; j <= size ; j++){
                Object.assign(myobj[i - 1] ,
                ({
                    [data[0][Object.keys(data[0])[j-1]]] : (data[i][Object.keys(data[i])[j-1]])
                }));
            }
        }

        console.log(myobj);
        return res.status(200).json({
            message : "Data Inserted Successfully" 
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

module.exports = { insertData }