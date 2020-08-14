FlowRouter.template('/ex_cashcharge','ex_cashcharge');

Template.ex_uploadpicture.onRendered(function() {
  $('#inp-cash').val(0)
});

Template.ex_cashcharge.helpers({
    board: function() {
        var _id = FlowRouter.getParam('_id')
        return Meteor.users.findOne({_id: _id}); // users랑 user()의 차이점?
    },

    link: function() {
        return Meteor.user().profile.profile_picture; // .link() 있으면 링크 형식으로 가져오는 거야
    },

    name: function() {
        return Meteor.user().profile.name;
    },

    cash: function() {
        return Meteor.user().profile.cash;
    },
  });

  Template.ex_cashcharge.events({
    'click #mybtn': function() {
      $('#inp-cash').val(0)
      var modal = document.getElementById('myModal');
      var btn = document.getElementById("mybtn");
      modal.style.display = "block";
    },

    'click #myclose': function() {
      var modal = document.getElementById('myModal');
      var span = document.getElementsByClassName("myclose")[0]; 
      modal.style.display = "none";
    },

    'click #btn-charge': function() {
      var input_cash = $('#inp-cash').val(); // input 값을 input_cash 변수에 저장
      var userInfo = Meteor.user(); // 사용자 정보 불러오기
      var temp = parseInt(Meteor.user().profile.cash) + parseInt(input_cash); // Integer로 변환해서 계산
      
      if($('#inp-cash').val() == "") {
        input_cash = 0;
        temp = parseInt(Meteor.user().profile.cash);
        Meteor.users.update({_id: userInfo._id}, {
          $set: {
            'profile.cash': temp
          }
        });
      } else {
        temp = parseInt(Meteor.user().profile.cash) + parseInt(input_cash);
        Meteor.users.update({_id: userInfo._id}, {
          $set: {
            'profile.cash': temp
          }
        });
      }

      alert("충전이 완료되었습니다.")
      $('#inp-cash').val(0); // input 창 정리

      // 자동으로 창 닫는 것처럼 보여짐
      var modal = document.getElementById('myModal');
      modal.style.display = "none";
    },
    
  });