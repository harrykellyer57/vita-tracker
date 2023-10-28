/*
filename: complex_code.js
content: Complex and Elaborate Code Example
*/

// Importing external libraries
const moment = require('moment');
const axios = require('axios');
const fs = require('fs');

// Initializing variables
let users = [];
let posts = [];
let comments = [];

// Making API requests for data
axios.get('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    users = response.data;
    return axios.get('https://jsonplaceholder.typicode.com/posts');
  })
  .then(response => {
    posts = response.data;
    return axios.get('https://jsonplaceholder.typicode.com/comments');
  })
  .then(response => {
    comments = response.data;
    processData(users, posts, comments);
  })
  .catch(error => console.error(error));

// Process data
function processData(users, posts, comments) {
  const userPostData = [];
  
  // Generate data structure with user and their posts
  users.forEach(user => {
    const userPosts = posts.filter(post => post.userId === user.id);
    userPostData.push({
      user,
      posts: userPosts,
    });
  });
  
  // Generate report for each user
  userPostData.forEach(data => {
    const { user, posts } = data;
    
    console.log(`User ${user.name} (${user.email}) - Posts: ${posts.length}`);
    
    posts.forEach(post => {
      const { id, title, body } = post;
      console.log(`Post ${id}: ${title}`);
      console.log(`\t${body}`);
      
      const postComments = comments.filter(comment => comment.postId === id);
      if (postComments.length > 0) {
        console.log('\tComments:');
        postComments.forEach(comment => {
          console.log(`\t\t${comment.body} - ${comment.email}`);
        });
      }
    });
    
    console.log('------------------');
  });
  
  generateReport(userPostData);
}

// Generate report file
function generateReport(userPostData) {
  const reportContent = [];
  
  userPostData.forEach(data => {
    const { user, posts } = data;
    
    reportContent.push(`User ${user.name} (${user.email}) - Posts: ${posts.length}`);
    
    posts.forEach(post => {
      const { id, title, body } = post;
      reportContent.push(`Post ${id}: ${title}`);
      reportContent.push(`\t${body}`);
      
      const postComments = comments.filter(comment => comment.postId === id);
      if (postComments.length > 0) {
        reportContent.push('\tComments:');
        postComments.forEach(comment => {
          reportContent.push(`\t\t${comment.body} - ${comment.email}`);
        });
      }
    });
    
    reportContent.push('------------------');
  });
  
  const reportFileName = `report_${moment().format('YYYYMMDD_HHmmss')}.txt`;
  
  fs.writeFile(reportFileName, reportContent.join('\n'), err => {
    if (err) {
      console.error('An error occurred while generating the report!');
    } else {
      console.log(`Report generated successfully: ${reportFileName}`);
    }
  });
}

// Start of execution
console.log('Fetching data from API...');
