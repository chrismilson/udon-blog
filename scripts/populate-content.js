var renderPost = (post) => {
  return `
    <div class="container post">
      <div class="title">
        <h2>${ post['title'] }</h2>
      </div>
      <div class="body content">
        ${
          post['body'].map((p) => {
            return '<p>\n' + p + '</p>'
          }).join('\n')
        }
      </div>
    </div>
  `;
};

post = {
  'title': "Yoshiya Purely Delicious",
  'body': [
    'I went to \"Yoshiya Purely Hand Cut Udon\" on Sunday. I ordered the "Large bukkake udon with par-boiled egg" and Chicken Tempura.',
    'As usual both chopped spring onion and fresh minced ginger were available to put on the udon after I recieved my order at the counter. It would have been nice to have them available where I was eating so that I could top up as I ate instead of stocking up at the beginning.',
    'The chicken went very well with the Udon. I dipped the chicken in the soup and the mixture of runny yolk and salty broth was very nice'
  ],
};

document.write(renderPost(post));
