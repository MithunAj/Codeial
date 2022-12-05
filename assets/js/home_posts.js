{
    
    var postDeletedNoty = new Noty({
        type:'success',
        text:'Post deleted',
        theme: 'relax',
        timeout: 2000
    })

    var postCreatedNoty = new Noty({
        type:'success',
        text:'Post Cerated',
        theme: 'relax',
        timeout: 2000
    })

    // method to submit the form data for new post using AJAX.
    let createPost = function(){
       
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/posts/createPost',
                data: newPostForm.serialize(),
                success:function(data){
                    let postCreated = newPost(data.data.post,data.data.userName);
                    $('#posts-list-container>ul').prepend(postCreated);
                    postCreatedNoty.show();
                    deletePost($(`#${data.data.post._id}`));
                    // deletePost($(' .delete-post-button,postCreated'))
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        })
        
    }    
   
    

    // method to create a post in DOM.

    let newPost = function(post,username){
        return (`<li id="post_${post._id}">  
              <small>
                    <a class='delete-post-button' id="${post._id}" href="posts/destroy/${post._id}">X</a>
              </small>      
        <p>
              ${post.content}
              <br>
              <small>
                    ${username}
              </small>
        </p>
    
        <div class="post-comments">

                    
                    <form class='post-comment-form' action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Add a comment" required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add"> 
                    </form>
                    

              <div class="post-comments-list">
                    <ul id="post-comments-${post._id}>">
                        
                    </ul>
              </div>      
        </div> 
    </li>`)
    }

    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post_${data.data.post_id}`).remove();
                    postDeletedNoty.show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();


    let allX = $('.delete-post-button');
    for(let obj of allX){
        deletePost(obj);
    }
}