

 const form = document.getElementById("studentForm");
    const tableBody = document.querySelector("#studentTable tbody");
    let editIndex = null;

    // Load students from localStorage
    let students = JSON.parse(localStorage.getItem("students")) || [];
    renderTable();

    // Form submit
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const studentId = document.getElementById("studentId").value.trim();
      const email = document.getElementById("email").value.trim();
      const contact = document.getElementById("contact").value.trim();

      if (!/^[A-Za-z ]+$/.test(name)) { alert("Name must contain only letters."); return; }
      if (!/^[0-9]+$/.test(studentId)) { alert("Student ID must contain only numbers."); return; }
      if (!/^[0-9]{10,}$/.test(contact)) { alert("Contact must be at least 10 digits."); return; }

      const student = { name, studentId, email, contact };

      if (editIndex !== null) {
        students[editIndex] = student;
        editIndex = null;
      } else {
        students.push(student);
      }

      localStorage.setItem("students", JSON.stringify(students));
      form.reset();
      renderTable();
    });

    // Render table
    function renderTable() {
      tableBody.innerHTML = "";
      students.forEach((s, index) => {
        const row = `
          <tr>
            <td>${s.name}</td>
            <td>${s.studentId}</td>
            <td>${s.email}</td>
            <td>${s.contact}</td>
            <td>
              <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
              <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });

      // Add dynamic scrollbar
      const displaySection = document.querySelector(".display-section");
      
      displaySection.style.overflowY = students.length > 5 ? "scroll" : "auto";
    }

    // Edit student
    window.editStudent = function(index) {
      const student = students[index];
      document.getElementById("name").value = student.name;
      document.getElementById("studentId").value = student.studentId;
      document.getElementById("email").value = student.email;
      document.getElementById("contact").value = student.contact;
      editIndex = index;
    }

    // Delete student
    window.deleteStudent = function(index) {
      if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderTable();
      }
    }