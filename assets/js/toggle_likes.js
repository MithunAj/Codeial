// for(let obj of $('.like-button')){
//     $(obj).click(function(e){
//         e.preventDefault();
//     })
//     // console.log(parseInt($(obj).text()));
//     let currentLikes = parseInt($(obj).text());
//     // $.ajax({
//     //     type: 'POST',
//     //     url: $(obj).prop('href'),
//     //     success: function(data){
//     //         // console.log(data);
//     //     },
//     //     error: function(err){
//     //         console.log(err.responseText)
//     //     }
//     // })
// }


class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'POST',
                url: $(self).attr('href')
            })
            .done(function(data){
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if(data.data.deleted === true){
                    likesCount--;
                }else{
                    likesCount++;
                }

                $(self).attr('data-likes',likesCount);
                $(self).html(`${likesCount} Likes`);
            })
            .fail(function(error){
                console.log('error in completing the like request',error);
            })
        })
    }
}