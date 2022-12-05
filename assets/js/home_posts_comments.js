{

    // this fucntion is initialized to gather all the objects for comment FORM and AJAX query to them.
    let createComments = function(){
        let commentsAdd = $('.post-comment-form');

        for(let obj of commentsAdd){
            $(obj).submit(function(e){
                e.preventDefault();
                $.ajax({
                    type:'POST',
                    url: '/comments/create',
                    data: $(obj).serialize(),
                    success: function(data){
                        let newComment = commentCreated(data.data.comment,data.data.userName);
                        $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                        deletComment(`#${data.data.comment._id}`);
                    },
                    error: function(err){
                        console.log(err,"An error occured");
                    }
                })
            })
        }

    }

    // this function created the comments html element and returns the same.
    let commentCreated = function(comment,username){
            return (`
            <li id="comment-${comment._id}">
            
            <br>
            <a id="${comment._id}" href="comments/destroy/${comment._id}" class="delete-comment">X</a>
       
            <p>
                ${comment.content}
            </p>
            <small> ${username}</small>
        </li>
            `)
    };
    // this taked the anchor tag of the comment and delets the comment with AJAX request.
    let deletComment = function(commentLink){
        $(commentLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(commentLink).prop('href'),
                success:function(data){
                   $(`#comment-${data.data.comment}`).remove(); 
                },
                error:function(err){
                    console.log(err);
                }
            })
        })
    }    

    // to update the AJAX delete queries for loaded comments.
    let commentsList = $('.delete-comment');
    for(let comment of commentsList){
        deletComment(comment);
    }
    createComments();
}