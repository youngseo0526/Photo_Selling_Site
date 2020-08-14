FlowRouter.template('/newex_posting/:_id', 'newex_posting');


Template.newex_posting.onRendered(function() {
  $('#editor').summernote({
    popover: {},
    minHeight: 200,
    maximumImageFileSize: 1048576*10
  });
});

Template.newex_posting.helpers({
  post: function() {
    var _id = FlowRouter.getParam('_id');
    if(_id === 'newPosting') {
      return {};    //새글 작성일때는 화면에 비어있는 데이터를 제공.
    }

    Meteor.setTimeout(function() { //화면 에디터에 편집 모드를 초기화 하기 위한 트릭
      $('#editor').summernote('reset')
    });

    return DB_POSTS.findOne({_id: _id});
  },
  link: function() {
    // 저장 된 이미지 링크를 반환
    return DB_FILES.findOne({_id: this.file_id}).link();
  }
});

Template.newex_posting.events({
  'click #btn-save': function() {
    // 사진 저장하는 기능
    // 파일 먼저 저장
    var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 파일 가져오기 // 이게 사진인듯
    var file_id = DB_FILES.insertFile(file);
    // DB 저장 시 파일의 _id와 name을 함께 저장
    //// 줠라 중요한 사실 : insert 두 번 들어가면 글도 두번 나온다!!!!!!!!!!
    // DB_POSTS.insert({    // 컨텐츠 DB에 저장
    //   file_id: file_id                // 저장 된 파일의 _id
    // });

    var name = $('#inp-name').val();
    var title = $('#inp-title').val();
    var html = $('#editor').summernote('code');

    if(!title) {
      return alert('제목은 반드시 입력 해 주세요.');
    }
    var _id = FlowRouter.getParam('_id');
    if( _id === 'newPosting') {
      DB_POSTS.insert({
        createdAt: new Date(),
        name: name,
        title: title,
        content: html,
        readCount: 0,
        file_id: file_id  
      })
    } else {
      var post = DB_POSTS.findOne({_id: _id});
      post.name = name;
      post.title = title;
      post.content = html;
      DB_POSTS.update({_id: _id}, post);
    }

    alert('저장하였습니다.');
    $('#inp-file').val(''); // 이거 추가
    $('#inp-name').val('');
    $('#inp-title').val('');
    $('#editor').summernote('reset');
    window.history.back();
  },
})