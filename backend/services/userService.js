const users=[
    {id:1,fname:"Deepa"},
     {id:2,fname:"john"},
];


//get
export function getAllUsers(){
    return users;
}

//add method

export function addUser(fname){
    const newUser={id:users.length+1,fname};
    users.push(newUser);
    return newUser
}