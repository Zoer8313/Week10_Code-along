class Member {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
}

class Team {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.members = [];
    }

    addMember(member) {
        this.members.push(member);
    }

    deleteMember(member) {
        let index = this.members.indexOf(member);//find index that member is at inside of members array
        this.members.splice(index, 1);//remove one element
    }
}

let teams = [];
let teamId = 0;//will get incremented

onclick("new-team", () => {//every time new team button gets pushed, team gets pushed into teams array,
    teams.push(new Team(teamId++, getValue("new-team-name")));//id increments, returns new team name
    drawDOM();//will iterate over teams array & build tables for them
});

function onclick(id, action) {//so we don't have to write code below over and over
    let element = document.getElementById(id);
    element.addEventListener("click", action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {//this one kind of confuses me
    let teamDiv = document.getElementById("teams");//bottom div in html file
    clearElement(teamDiv);//why are we clearing this here?
    for(team of teams) {//will draw that team to the team div-iterate over the teams
        let table = createTeamTable(team);//this function will take a passed in team, & build a table out of it
        let title = document.createElement("h2");//heading
        title.innerHTML = team.name;//build title based on data inside instance of team class
        title.appendChild(createDeleteTeamButton(team));//generate button to click on & delete team
        teamDiv.appendChild(title);//adding team title
        teamDiv.appendChild(table);//adding team table
        for(member of team.members) {
            createMemberRow(team, table, member);
        }
    }
}

function createMemberRow(team, table, member) {//will create row with member data
    let row = table.insertRow(2);//why is this 2?
    row.insertCell(0).innerHTML = member.name;//member's name in first cell
    row.insertCell(1).innerHTML = member.position;//member's position in second cell
    let actions = row.insertCell(2);//third cell
    actions.appendChild(createDeleteRowButton(team, member));//need to know which member to delete, off of which team
}

function createDeleteRowButton(team, member) {//nned to create a button and add it to cell
    let btn = document.createElement("button");//create a button element
    btn.className = "btn btn-primary";//is className a built in property?
    btn.innerHTML = "Delete";//reads "delete" on webpage
    btn.onclick = () => {//"onclick" on L33 has parameters(id, action)- do we not need to include these?
        let index = team.members.indexOf(member);//find index of member
        team.members.splice(index, 1);//splice the index, one item
        drawDOM();//not manipulating the DOM in this function when clicked- remove it from the team member's array.
    }             //clear out the div and iterate through the teams, and draw the data. change the data itself, then
    return btn;   //re-render data. explain concept of returning buttons?
}

function createDeleteTeamButton(team) {//team that will be removed from teams array
    let btn = document.createElement("button");//create button element
    btn.className = "btn btn-primary";
    btn.innerHTML = "Delete Team";//written on webpage
    btn.onclick = () => {//again, no parameters
        let index = teams.indexOf(team);//index of team that got passed in
        teams.splice(index, 1);//splice index, one position
        drawDOM();//changed data, so need to re-render what DOM has
    }
    return btn;//appending a child, createDeleteRowButton, so we need to return button, so it can be appended to our
}              //actions on our row and table level.

function createNewMemberButton(team) {
    let btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.innerHTML = "Create";
    btn.onclick = () => {
        team.members.push(new Member(getValue(`name-input-${team.id}`), getValue(`position-input-${team.id}`)));
        drawDOM();
    }
    return btn;
}

function createTeamTable(team) {//takes a team, & build table off of that
    let table = document.createElement("table");//create new table that represents this team
    table.setAttribute("class", "table table-dark table-striped");
    let row = table.insertRow(0);//inserting rows
    let nameColumn = document.createElement("th");//table header for name column
    let positionColumn = document.createElement("th");//table header for position column
    nameColumn.innerHTML = "Name";//reads on webpage
    positionColumn.innerHTML = "Position";//reads on webpage
    row.appendChild(nameColumn);//adding name column to row
    row.appendChild(positionColumn);//adding position column to row
    let formRow = table.insertRow(1);//another row- form where we can insert new members
    let nameTh = document.createElement("th");
    let positionTh = document.createElement("th");
    let createTh = document.createElement("th");//why are these table headers in the second row?
    let nameInput = document.createElement("input");//where name input will be inserted
    nameInput.setAttribute("id", `name-input-${team.id}`);//attribute is an id, template literal makes dynamic
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("class", "form-control");//what does form-control do?
    let positionInput = document.createElement("input");//pretty similar, but with postions
    positionInput.setAttribute("id", `position-input-${team.id}`);
    positionInput.setAttribute("type", "text");
    positionInput.setAttribute("class", "form-control");
    let newMemberButton = createNewMemberButton(team);//pass in data from team, to associate this btn w/ this specific team
    nameTh.appendChild(nameInput);//aaaand I get lost hereabouts
    positionTh.appendChild(positionInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(positionTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {//remove every first child, while there still is a first child. Dont want to delete entire
    while(element.firstChild) {//element, just clear everything out of it. //this will be true so long as theres a 1st child
        element.removeChild(element.firstChild);//will remove first child, until element is completely cleared out.
    }
}