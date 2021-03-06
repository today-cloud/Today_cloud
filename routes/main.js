const express = require( 'express' );
const path = require( 'path' );
const mysql = require( 'mysql' );
const router = express.Router();


var conn = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'cloud'
});

function t_c_info_on() {
  location.href = "/t_c_info";
}

function login_on() {
  location.href = "/login";
}

function signup_on() {
  location.href = "/signup";
}

function userinfo_on() {
    location.href = "/userinfo";
  }

function main_latest_sort(callback){
    // select b.board_Num as bnum, u.user_Nick, u.user_Profile, b.board_Content,count(distinct g.good_pk) as board_like, group_concat(distinct t.tag_Tagname) as tag
    const sql = `
		select b.board_Num as bnum, u.user_Nick, u.user_Profile, b.board_Content,count(distinct g.good_pk) as board_like, group_concat(distinct t.tag_Tagname) as tag
		from T_Board as b 
		join T_User as u on b.user_Num = u.user_Num
		left join T_Good as g on b.board_Num = g.board_Num
		left join T_Tag as t on b.board_Num = t.board_Num
		group by b.board_Num order by b.board_Date desc;
	`;
  conn.query(sql,function(err,results){
    if(err){
      console.log(err);
    }else{
      callback(results);
    }
  });
}

function main_like_sort(callback){
  const sql = `
		select u.user_Name, u.user_Profile, b.board_Content,count(distinct g.good_pk) as board_like, group_concat(distinct t.tag_Tagname) as tag
		from T_Board as b 
		join T_User as u on b.user_Num = u.user_Num
		left join T_Good as g on b.board_Num = g.board_Num
		left join T_Tag as t on b.board_Num = t.board_Num
		group by b.board_Num order by count(distinct g.good_pk) desc;
	`;
  conn.query(sql,function(err,results){
    if(err){
      console.log(err);
    }else{
      callback(results);
    }
  });
}

function tag_sql(callback){
  const sql = "select tag_Tagname,count(tag_Tagname)as coun from T_Tag group by tag_Tagname order by coun desc limit 5;";
  conn.query(sql,function(err,results){
    if(err){
      console.log(err);
    }else{
      callback(results);
    }
  })
}

function user_sql(req,callback){
  const sql = "select * from T_User where user_Num = '" + req.session.uid +"';";
  conn.query(sql, function(err,result){
    if(result.length == 0) {
      res.redirect('../login');
    }else{
      var user = result[0];
      console.log("user ?????? ")
      console.log(user);
      callback(user);
    }
  });
}
function board_sql(callback){
  const sql = "select * from T_Board order by board_Date desc;";
  conn.query(sql,function(err,results){
    if(err){
      console.log(err);
    }else{
      console.log(results);
      callback(results);
    }
  });
}

function board_good(req,callback){
  var uid = req.session.uid;
  const sql = "select * from T_Good where user_Num = '"+uid+"';";
  conn.query(sql, function(err,results){
    if(err){
      console.log(err);
    }else{
      console.log('????????? ?????? ????????? ??????');
      console.log(results);
      callback(results);
    }
  });
}

function login_session(req,callback){
  var uid = req.session.uid;
  const sql = "select * from T_User where user_Num = '"+uid+"';";
  conn.query(sql,function(err,result){
    if(err){
      console.log(err);
    }else{
      if(result.length>0){
        callback(1);
      }else{
        callback(0);
      }
    }
  });
};


router.post('/board_check',(req,res)=>{
  board_pk = req.body.board_pk;
  const sql = `select u.user_Name, u.user_Profile, b.board_Title, b.board_Content,count(distinct g.good_pk) as board_like, group_concat(distinct t.tag_Tagname) as tag from T_Board as b 
  join T_User as u on b.user_Num = u.user_Num left join T_Good as g on b.board_Num = g.board_Num left join T_Tag as t on b.board_Num = t.board_Num where b.board_Num = ${board_pk} group by b.board_Num;`;

  const sql_comment = `select  u.user_Profile, u.user_Nick,c.comment_Image, c.comment_Content, count(distinct cl.like_pk) as comment_like
  from T_Comment as c
  join T_User as u on u.user_Num = c.user_Num
  left join T_Commentlike as cl on cl.comment_Num = c.comment_Num
  where c.board_Num = ${board_pk}
  group by c.comment_Num;`;
  conn.query(sql,function(err, result){
    if(err){
        console.log(err);
    }else{
        conn.query(sql_comment,function(err,results){
            if(err){
                console.log(err)
            }else{
                res.send({board:result,comment:results});
            }
        })
        
    }
  });
});

// ##############  main page  ##################
router.get('/',(req,res)=>{
  main_latest_sort(function(info){
    tag_sql(function(tag){
      board_good(req,function(board){
        login_session(req,function(ck){
          console.log('ck check main check');
          console.log(ck);
          res.render('main',{info:info,tag:tag,board_good:board,ck:ck});
        });
      });
    });
  });
});

  // user_sql(req,function(user){
  //   board_sql(function(board){
  //     tag_sql(function(tag){
  //       res.render('main',{uesr:user,board:board,tag:tag});
  //     });
  //   });
  // });


// ############## main page - session check ##############
// app.get('/main',(req,res)=>{
//   var sql = "select * from T_User where user_Num = '" + req.session.uid +"'";
//   conn.query(sql,function(err,result){
//     if(result.length == 0) {
//       res.render('login');
//     }else{
//       req.session.uid = result[0].user_Num;
//       req.session.save(function(err){
//         res.render('main',{user:result[0]});
//       });
//     }
//   });
// });

module.exports = router;