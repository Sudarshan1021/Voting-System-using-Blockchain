
App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  

  init: function() {
   
    return App.initWeb3();
  },

 

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
      var account = web3.eth.accounts[0];
      var accountInterval = setInterval(function(){
        if(web3.eth.accounts[0]!==account){
          account = web3.eth.accounts[0];
          updateInterface();
        
        }
      },100);
     //web3.currentProvider.publicConfigStore.on('update',callback);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },
  



  initContract: function() {
    
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();
        
      return App.render();
      
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        //App.render();
        $("nn").click(function(){
          App.render();
        }
        )
        //setTimeout(location.reload.bind(location),10000);
      });
    });
      
  },

  
  
  
  render: function() {

    
    var electionInstance;
    //var loader = $("#loader");
    //var content = $("#content");
    //var sss = $("#sss");
   // location.reload(true);
    
    // sss.show();
    //loader.show();
    //content.hide();
    
   
    // Load account data
    web3.eth.getCoinbase(function(err, account) {
     // web3.currentProvider.publicConfigStore.on('update',callback);
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

  

    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);

          // Render candidate ballot option
          var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
          candidatesSelect.append(candidateOption);
        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
      if(hasVoted) {
        $('#ff').hide();
      }
     else{
      $('#ff').show();
     }
      //sss.show();
      
      //loader.hide();
      //content.show();
      
    }).catch(function(error) {
      console.warn(error);
    });
  },


  ss:function(){
   
    
   if(App.account == addd) {
    var s=$('#usr').val();
    App.contracts.Election.deployed().then(function(instance){
      return instance.addCandidate(s);
      
    }).then(function(result) {
      // Wait for votes to update
    //  $("#content").hide();
     // $("#loader").show();
     //setTimeout(location.reload.bind(location),6000);
    }).catch(function(err) {
      console.error(err);
    });
  }
  
},

  castVote: function() {
    if(App.account != addd) {
    var candidateId = $('#candidatesSelect').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
     // $("#content").hide();
     // $("#loader").show();
      
    }).catch(function(err) {
      console.error(err);
    });
  }
}
};
  

$(function() {
  $(window).load(function() {
    $("#contain").hide();
    
  App.init();

    //App1.init();
 });

});



function myFunction(){
 
    
  var electionInstanc;
  App.contracts.Election.deployed().then(function(instance) {
    electionInstanc = instance;
    return electionInstanc.candidatesCount();
  }).then(function(candidatesCount) {
    if(candidatesCount>=2) {
  var x = document.getElementById("ssss");
  var y = document.getElementById("sssss");
  document.getElementById("ww").disabled = true;
  if(x.style.display === "none"){
    x.style.display = "block";
  }
  else{
    x.style.display ="none";
  }
  if(y.style.display === "block"){
    y.style.display = "none";
  }
  else{
    y.style.display ="block";
        }
}
  
});
    }


function my(){

 
  addd = web3.eth.accounts[0];
  document.getElementById("nnn").disabled = true;
  $("#contain").show();
  $("#mast").hide();
}


function mymy(){
  var electionInstanc;
  App.contracts.Election.deployed().then(function(instance) {
    electionInstanc = instance;
    return electionInstanc.candidatesCount();
  }).then(function(candidatesCount) {
    if(candidatesCount>=2) {
if(document.getElementById("h").value<=0 || document.getElementById("h").value==""){
return;}
else{
  time_in_minutes = document.getElementById("h").value;
  current_time = Date.parse(new Date());
   deadline = new Date(current_time + time_in_minutes*60*1000);
run_clock('clockdiv',deadline);}
}
});}
    


    


function time_remaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}
function run_clock(id,endtime){
	var clock = document.getElementById(id);
	function update_clock(){
		var t = time_remaining(endtime);
    clock.innerHTML = 'minutes: '+t.minutes+'<br>seconds: '+t.seconds;
		if(t.total<=0){ 
      clearInterval(timeinterval);
      document.getElementById("vote").disabled = true;
      document.getElementById("After").innerHTML = "Election Ended. No more votes can be casted!";
    }
  }
	update_clock(); // run function once at first to avoid delay
	var timeinterval = setInterval(update_clock,1000);
}
   

