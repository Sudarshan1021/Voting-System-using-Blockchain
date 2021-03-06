pragma solidity ^0.4.2;





contract Election {

    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

     event addEvent (
        string indexed _name
    );

    constructor () public {
        
        
        //addCandidate("Candidate 1");
        //addCandidate("Candidate 2");
        //addCandidate("Candidate 3");
    }

    
    function addCandidate (string _name) public {
        
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        emit addEvent(_name);
    }

    function vote (uint _candidateId) public {

       
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}
