comments = [];
default_comments = [];
var is_sorted = false;
class comment {
	constructor(content, commentstree, id, rating) {
    	this.content = content;
    	this.tree = commentstree;
    	this.id = id;
    	this.rating = rating;
	}
}

function findCommIndex(arraytosearch, key, valuetosearch) {
 
	for (var i = 0; i < arraytosearch.length; i++) {
		 
		if (arraytosearch[i][key] == valuetosearch) {
			return i;
		}
	}
	return null;
}

function remove_comments() {
	//remove comments with default sorting
	$('.commBlock').remove();
	$('.comments-tree').remove();
}

function get_comments() {
	//get all comments in array of objects (comments[] of class comment)
	$.each($('.commBlock'), function (index, value) { 
		var attr = $(value).attr('data-level');
		if (attr == 0) {
			if ($(value).find('.cSucc').text() > 0){
				var COMM = new comment ($(value), " ", value.getAttribute("data-comment-id"), $(value).find('.cSucc').text());
				comments.push(COMM);
			} else {
				var COMM = new comment ($(value), " ", value.getAttribute("data-comment-id"), $(value).find('.cWarn').text());
				comments.push(COMM);	
			}

			if (!comments[comments.length-1].rating) {
				comments[comments.length-1].rating = '0';
			}
		}
	});

	$.each($('.comments-tree'), function (index, value) { 
		var parent_classname =  $(value).parent().prop('className');
		var child_comm_id = $(value).attr('data-comment-id');
		var parent_index = 0;

		if (!parent_classname){
			parent_index = findCommIndex(comments, "id", child_comm_id);
			comments[parent_index].tree = $(value).html();
		}
	});

	default_comments = comments;
}

function sort_comments_by_rating(a,b) {
  if (parseInt(a.rating) < parseInt(b.rating))
    return -1;
  if (parseInt(a.rating)  > parseInt(b.rating))
    return +1;
  return 0;
}

function add_button() {
	$("<strong id = 'sort_comments' style='cursor:pointer' title = 'Упорядочить комментарии по рейтингу'> ↕ <i>Упорядочить</i></strong>").insertAfter("#total-comments-count");
}

function sort_comments() {
	if (!is_sorted){
		comments.sort(sort_comments_by_rating);
		is_sorted = true;
	} else {
		comments = default_comments;
		is_sorted = false;
	}
}

function add_sorted_comments() {
	comments.forEach(function(item, i, comments) {
		$(comments[i].content.add($(comments[i].tree)).insertAfter("#comments"));
	});
}

function get_and_sort() {
	get_comments();
	sort_comments();
	remove_comments();
	add_sorted_comments();
}

add_button();

$(document).ready(function(){
    $('#sort_comments').bind("click", get_and_sort);
});
