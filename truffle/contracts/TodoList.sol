// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList{
    
    struct Task{
        uint taskId;
        string description;
        bool completed;
    }

    struct User{
        address userAddress;
        string username;
        bool registered; 
        mapping(uint=>Task) tasks;
        uint taskCount;
    }

    mapping(address=>User) public users;

    function registerUser(string memory _username) public{
        require(!users[msg.sender].registered,"User already registered");
        users[msg.sender].username = _username;
        users[msg.sender].userAddress = msg.sender;
        users[msg.sender].registered=true;
    }

    modifier onlyRegisteredUser(){
        require(users[msg.sender].registered==true,"User not registered");
        _;
    }

    function addTask(string memory _description) public onlyRegisteredUser{
        uint taskIndex = users[msg.sender].taskCount;
        users[msg.sender].tasks[taskIndex] = Task(taskIndex,_description,false);
        users[msg.sender].taskCount++;  
    }
    function markTaskCompleted(uint _taskId) public onlyRegisteredUser{
        require(_taskId<=users[msg.sender].taskCount,"Invalid Task Id");
        users[msg.sender].tasks[_taskId].completed = true;
    }

    function deleteTask(uint _taskId) public onlyRegisteredUser{
        require(_taskId < users[msg.sender].taskCount, "Invalid Task Id");
        // Move the last task to the deleted task index
        users[msg.sender].tasks[_taskId] = users[msg.sender].tasks[users[msg.sender].taskCount - 1];
        delete users[msg.sender].tasks[users[msg.sender].taskCount - 1];
        users[msg.sender].taskCount--;
    }

    function getTask(uint _taskIndex) public view onlyRegisteredUser returns (uint, string memory, bool) {
        require(_taskIndex < users[msg.sender].taskCount, "Invalid task index.");
        Task memory task = users[msg.sender].tasks[_taskIndex];
        return (task.taskId,task.description, task.completed);
    }

    function isRegistered() public view returns(bool){
        return users[msg.sender].registered;
    }
}