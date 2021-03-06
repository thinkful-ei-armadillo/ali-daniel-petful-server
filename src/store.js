'use strict';
// data for JSON responses

const dogInfo = [
  {
    imageURL:
      'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription:
      'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL:
      'https://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/istock_86999965_small.jpg?itok=EzyZsGnK&resize=1100x1100',
    imageDescription: 'A loveable Pitbull',
    name: 'Beans',
    sex: 'Female',
    age: 7,
    breed: 'Pitbull',
    story: 'A sordid past riddled with intrigue.'
  },
  {
    imageURL:
      'https://vetstreet.brightspotcdn.com/dims4/default/514331d/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F26%2F0d%2F6443c92b4c67ae315a8bb8be16e1%2FChihuahua-AP-KIDP62-645lc061113.jpg',
    imageDescription: 'A regal chihuahua',
    name: 'Cous Cous',
    sex: 'Male',
    age: 2,
    breed: 'Chihuahua',
    story: 'Owner passed away, couldn\'t handle cuteness of this dog.'
  }
];

const catInfo = [
  {
    imageURL:
      'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription:
      'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },
  {
    imageURL:
      'https://www.thesprucepets.com/thmb/0Y_9qW07-uYqkW9_kcasnwXqCi0=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/twenty20_d4afe7d2-ebe8-4288-a2ef-bcecbb99df88-5a8c4309c064710037e9965e.jpg',
    imageDescription: 'Adorable kitten that loves balls',
    name: 'Roger',
    sex: 'Male',
    age: 1,
    breed: 'Scottish Fold',
    story: 'Left alone behind a trailer'
  },
  {
    imageURL:
      'https://vetstreet.brightspotcdn.com/dims4/default/167768e/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F0d%2F4b1f209dc511e0a2380050568d634f%2Ffile%2FAbyssinian-3-645mk062211.jpg',
    imageDescription: 'Adorable kitten -- adopt her please!',
    name: 'Sphynx',
    sex: 'Female',
    age: 4,
    breed: 'Russian',
    story: 'Loves hacking into servers in its free time.'
  }
];

const userInfo = [
  {
    name: 'Tauhida'
  },
  {
    name: 'Alex'
  },
  {
    name: 'Wenceslao'
  },
  {
    name: 'Daniel'
  },
  {
    name: 'Ali'
  }
];

class _Node {
  constructor(value) {
    (this.value = value), (this.next = null), (this.prev = null);
  }
}
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }
  enqueue(data) {
    const node = new _Node(data);
    if (this.first === null) {
      this.first = node;
    }
    if (this.last) {
      node.next = this.last;
      this.last.prev = node;
    }
    this.last = node;
  }
  dequeue() {
    if (this.first === null) {
      return;
    }
    const node = this.first;
    this.first = node.prev;
    if (node === this.last) {
      this.last = null;
    }

    return node.value;
  }

  peek() {
    if (this.first) return this.first.value;
    else return null;
  }
}

const Dogs = new Queue();
Dogs.enqueue(dogInfo[0]);
Dogs.enqueue(dogInfo[1]);
Dogs.enqueue(dogInfo[2]);

const Cats = new Queue();
Cats.enqueue(catInfo[0]);
Cats.enqueue(catInfo[1]);
Cats.enqueue(catInfo[2]);

const Users = new Queue();
Users.enqueue(userInfo[0]);
Users.enqueue(userInfo[1]);
Users.enqueue(userInfo[2]);
Users.enqueue(userInfo[3]);

function catRefill() {
  Cats.enqueue(catInfo[1]);
  Cats.enqueue(catInfo[2]);
  Cats.enqueue(catInfo[0]);
}

function dogRefill() {
  Dogs.enqueue(dogInfo[0]);
  Dogs.enqueue(dogInfo[2]);
  Dogs.enqueue(dogInfo[1]);
}

function userRefill() {
  Users.enqueue(userInfo[0]);
  Users.enqueue(userInfo[1]);
  Users.enqueue(userInfo[2]);
  Users.enqueue(userInfo[3]);
}

module.exports = {
  dogInfo,
  catInfo,
  catRefill,
  dogRefill,
  userRefill,
  Cats,
  Dogs,
  Users
};
