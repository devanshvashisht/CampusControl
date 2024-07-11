const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./models');
const studentSchema = require('./validation/student');
const validate = require('./middleware/validate');

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

db.sequelize.sync();



  
app.post('/students', validate(studentSchema),async(req,res)=>{
    

    
    const { rollNo, name, studentClass, section, contactNo } = req.body;
    

    try{
        const student = await db.Student.create({
            rollNo,
            name,
            studentClass,
            section,
            contactNo,

        });
        res.status(200).json({message: 'Student added successfully'});
    } catch(err){
        if(err.name==='SequelizeUniqueConstraintError'){
            res.status(409).json({ error: 'Student with this roll number already exists' });
        }else {
            console.error(err);
            res.status(500).json({ error:err.message});
        }
      
    }
});  

app.get('/students', async (req, res) => {
    try {
      const students = await db.Student.findAll();
      res.json({ data: students });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});
   
app.put('/students/:rollNo',validate(studentSchema),async (req,res)=>{
    const {rollNo} = req.params;
    

    

    const {name , studentClass , section, contactNo} = req.body;

    try{
        const student = await db.Student.findOne({where: {rollNo}});

        if(!student){
            return res.status(404).json({ error: 'Student not found' });
        }

        student.name = name;
        student.studentClass = studentClass;
        student.section = section;
        student.contactNo = contactNo;

        await student.save();
        res.json({message: 'Student updated successfully', data:student});

    
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });

    }
});

app.delete('/students/:rollNo', async (req,res)=>{
    const {rollNo} = req.params;
    try{
        const student = await db.Student.findOne({ where: { rollNo } });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        await student.destroy();
        res.json({ message: 'Student deleted successfully', data: student });

      

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });

    }

    
})

app.get('/students/search/:query', async (req, res) => {
    const { query } = req.params;
  
    try {
      const students = await db.Student.findAll({
        where: {
          [db.Sequelize.Op.or]: [
            { name: { [db.Sequelize.Op.iLike]: `%${query}%` } },
            { rollNo: { [db.Sequelize.Op.iLike]: `%${query}%` } },
            { studentClass: { [db.Sequelize.Op.iLike]: `%${query}%` } },  
            { section: { [db.Sequelize.Op.iLike]: `%${query}%` } },
          ],
        },
      });
      res.json({ data: students });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

  

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});