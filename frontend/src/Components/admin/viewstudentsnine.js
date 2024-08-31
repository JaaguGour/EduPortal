 import { Container, Row } from "react-bootstrap";
import AdminNavBar from "./navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import CloseButton from "react-bootstrap/CloseButton";
import { useNavigate } from "react-router-dom";
export const StudentsofNineclass = () => {
  const [studentsdata, setstudentsdata] = useState([]);
  //function for get all the students information which is in 6th class.
  const navigate = useNavigate();
  async function getstudentinfo() {
    try {
      const response = await axios.get("/student/getclasswisestudents", {
        params: {
          class: 9,
          teacherid: "Vikram9900",
        },
      });
      console.log(response.data);
      setstudentsdata(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  //  console.log(studentsdata)

  const admininfo = useSelector((state) => state.AdminInfo.admininfo);
  useEffect(() => {
    getstudentinfo();
  }, []);

  // Function to handle button click
  const handleButtonClick = (student) => {
    console.log("Button clicked for:", student);
    // Perform any action you want with the student data
    console.log(student.user_name);
    console.log(student.class);
    
   removeStudent(student);

  };

  //request for delete student
  async function removeStudent ( student){
     try{
      const response = await axios.delete('/student/removestudent',{params: {
       studentinfo : student
      }})
      console.log(response);
     }
     catch(error){
      console.log(error);
     }
  }



  const columns = [
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "address1",
      text: "Address",
    },
    {
      dataField: "first_name",
      text: "Name",
    },
    {
      dataField: "password",
      text: "DOB",
    },
    {
      dataField: "phone1",
      text: "Phonenumber",
    },
    {
      dataField: "gender",
      text: "Gender",
    },
    {
      dataField: "user_name",
      text: "user_name",
    },
    {
      dataField: "password",
      text: "Password",
    },
    {
      dataField: "father_name",
      text: "father_name",
    },
    {
      dataField: "Remove student",
      text: "Remove student",
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "rgba(0,187,167,255)", border: "none" }}
            onClick={() => handleButtonClick(row)}
          >
            Remove
          </button>
        );
      },
    },
  ];

   function clickback() {
     navigate("/admin/viewstudents");
   }
  return (
    <Container className="text-black bg-success" fluid>
      <Row>
        <AdminNavBar />
      </Row>
      <Row className="my-2">
        <h3 className="w-75"> Welcome {admininfo.name}</h3>
        <CloseButton
          style={{ position: "relative", left: "17rem" }}
          onClick={clickback}
        />
      </Row>
      <Row>
        <BootstrapTable
          keyField="aadhar_numbe"
          data={studentsdata}
          columns={columns}
        />
      </Row>
    </Container>
  );
};
