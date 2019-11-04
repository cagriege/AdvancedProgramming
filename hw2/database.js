class Course {
constructor(coursename,examtime,examdate,room){
this.coursename=coursename
this.examtime=examtime
this.examdate=examdate
this.room=room
}
toString () {
    return this.coursename + " " + this.examdate
}
}
class Student {
constructor(id,name,gpa,courses){
this.id=id
this.name=name
this.gpa=gpa
this.courses= courses
}
toString () {
    return this.id +" "+ this.name
}
}
class Database {
    constructor(){
        this.urlS = "https://maeyler.github.io/JS/data/Students.txt";
        this.urlC = "https://maeyler.github.io/JS/data/Courses.txt";
        this.Students = new Map();
        this.Courses = new Map();
		this.readCourses();
        this.readStudents();
		this.keys1=[]
        this.keys2=[]
        this.vals1=[]
        this.vals2=[]
        
    }
readStudents() {
    console.log("readStudents "+this.urlS);
    fetch(this.urlS)
    .then(r => r.text())
    .then(r => this.addStudent(r))   

}
readCourses() {
    console.log("readCourses "+this.urlC);
    fetch(this.urlC)
    .then(r => r.text())
    .then(r => this.addCourse(r))  
    
}
addStudent(txt){ // Set students 
   let msg = txt.length+" chars, ";
   let a = txt.split("\n");
   msg += a.length+" lines, ";
   for (let s of a) {
     let student = this.parseStudent(s);
     this.Students.set(student.id,student);
     this.keys1.push(student.id);
     this.vals1.push(student);
   }
  
   this.report(msg + this.keys1.length+" students");
}
parseStudent(line){
	let s = line.split("\t");
    let courses = [];
    for (let i=3; i<s.length; i++) 
    courses.push(this.Courses.get(s[i]));
    
    const student = new Student(s[0],s[1],s[2],courses)

    return student
}
addCourse(txt){  // Set courses 
	let msg = txt.length+" chars, ";
    let a = txt.split("\n");
    msg += a.length+" lines, ";
    console.log(msg);
    for (let s of a) {
      let course = this.parseCourse(s);
      this.Courses.set(course.coursename,course);
      this.keys2.push(course.coursename);
      this.vals2.push(course);
      }
    this.report(msg + this.keys2.length+" courses");
}
parseCourse(line){
    let c = line.split("\t");
    let rooms = [];
    for (let i=3; i<c.length; i++) rooms.push(c[i]);
    const course = new Course(c[0],c[1],c[2],rooms)
    return course
}
randomStudent(){        //* A random student - array
    let i = Math.trunc(this.keys1.length * Math.random());
    let b = this.vals1[i];
    this.report(b.name,b.id);
}
randomCourse(){ // A random course - array
    let i = Math.trunc(this.keys2.length * Math.random());
    let b = this.vals2[i];
    this.report(b.coursename);
} 
randomRoom(){ // A random room - array
    let i = Math.trunc(this.vals2.length * Math.random());
    let b = this.vals2[i];
    this.report(b.room[0]);
}
aboveGpa(gpa){          //* Number of students above a given GPA - MAP
    let numberOfAbove = 0;
    let numberOfBelow = 0;
    for (let std of this.Students.values()) 
        if (std.gpa > gpa) numberOfAbove++;
        else numberOfBelow++;
    this.report("Number of students above a "+gpa+" GPA : "+numberOfAbove+"\n")
    this.report("Number of students below a "+gpa+" GPA : "+numberOfBelow)
    
}

bestGpa(){              //  find best gpa-MAP
    let b = this.vals1[0];
    for (let student of this.Students.values())
        if (student.gpa > b.gpa) b = student;
    this.report("Best: "+b.name+" "+b.gpa, b.id);
}

showStudent(id){            //* Courses taken by a given student - MAP
    let t = id+" ";
    let std = this.Students.get(id);
    if (!std) {
        this.report(t+"not found"); return;
    }
    t += std.name+" "+std.gpa;
    //console.log(t, std.courses.length+" courses", std.courses);
    this.report(t, std.courses.length+" courses", std.courses);
    return std
}
examScheduleGivenStu(id){             //* Exam schedule for a given student - MAP
    let std = this.Students.get(id);
    /*let std = this.showStudent(id);*/
    let examSchedule = []
    for(let course of std.courses)
    examSchedule.push(course.coursename+" "+course.examdate+" "+course.examtime)
    this.report(std.name,": Exam List",examSchedule)
}
studentListGivenCourse(scode){   //* Student list for a given course - MAP
	setTimeout(2500);
    scode = scode.toUpperCase();
    let a = [];
    for (let std of this.Students.values()){
    for(let crs of std.courses){
        if (crs.coursename == scode) 
            a.push(std.id+" "+std.name);
            }
        }
        if (a.length > 0) this.report(scode+": ", a.length+" students", a);
        else this.report("No students in "+scode);
}
courseListGivenRoom(rcode){             //* Course list for a given exam room - MAP
    rcode = rcode.toUpperCase();
    let a=[];
    for (let course of this.Courses.values())
    for (let room of course.room)
        if(room.includes(rcode)) 
            a.push(course.coursename+"")
        if(a.length>0) this.report(rcode+": ", a.length+" courses given in a "+rcode, a);
        else this.report("no courses were found in this class.")
}
avgFunc(){
	let sum=0;
	let counter=0;
	for(let i of this.Students){
		if(isNaN(i[1].gpa)==false){
			sum=sum+Number(i[1].gpa);
			counter++;
		}
	}
	let avg =sum/counter;
	console.log(avg);
}
totalNumberOfCourseGivenRoom(rcode){            //* Total number of courses in a given room- MAP
    rcode = rcode.toUpperCase();
    let a = [];
    for (let course of this.Courses.values())
    for (let room of course.room)
        if(room.includes(rcode)) 
            a.push(course.coursename+"")
    if (a.length > 0) this.report(a.length+" courses given in a "+rcode);
    else this.report("no courses were found in this class.")
}
report(msg, id, list) {
    out.innerHTML += "<br>"; msg += " ";
    out.appendChild(document.createTextNode(msg));
    let n1;
    if (id) {
        n1 = document.createElement("span");
        n1.appendChild(document.createTextNode(id));
        n1.classList.add("link");
        out.appendChild(n1); msg += id;
        //n1.addEventListener("click", doClick);
    }
    if (list) {
        let n2 = document.createElement("span");
        n2.appendChild(document.createTextNode(""));
        n2.innerHTML += list.join("<br>");
        n2.classList.add("course");
        if (n1) n1.appendChild(n2);
    }
    console.log(msg);
}
doClick(evt) {
    //console.log(evt);
    let t = evt.target;
    //document.elementFromPoint(evt.clientX, evt.clientY);
    let s = t.innerText;
    if (/^\d+$/.test(s)) this.showStudent(s); //s contains digits
    else if (t = t.firstElementChild) {
        t.style.visibility = "";
        let hide = function () {
            t.style.visibility = "hidden";
        };
        setTimeout(hide, 500);
    }
}
}