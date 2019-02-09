import config from './config'

var session = solace.SolclientFactory.createSession(config); 
 try { 
    session.connect(); 
 } catch (error) { 
    console.log(error); 
 }