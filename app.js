const app = angular.module('app', ['ui.bootstrap'])
const contractAddressHex = 'a307b905140c82b37f2d7d806ef9d8858d30ac87'

function Tokenizer(data) {
  this.data = data
}

const pat = new Tokenizer({
  name: 'Pat Liu',
  info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
})

function Token(data) {
  this.data = data
  this.tokenizer = pat
  this.imageUrls = this.data.imageUrls.map((imageUrl) => {
    return `./assets/images/${this.data.id}/${imageUrl}`
  })
  this.thumbUrls = this.data.thumbUrls.map((thumbUrl) => {
    return `./assets/images/${this.data.id}/${thumbUrl}`
  })
  this.redeemUrl = `https://redeem.guildcrypt.com/#${this.data.id}`
  this.termsUrl = `./assets/terms/${this.data.id}.pdf`
  this.trackerUrl = `https://etherscan.io/token/0x${contractAddressHex}?a=${this.data.id}`
  this.buyUrl = `https://opensea.io/assets/0x${contractAddressHex}/${this.data.id}`
}

const tokens = [
  new Token({
    id: 0,
    name: 'Unlimited Black Lotus (BGS 6.0)',
    description: 'A BGS graded 6.0 (9/6/6/6) Unlimited Black Lotus. BGS #0010945396.',
    sunsetLength: '90 Days',
    thumbUrls: ['front.thumb.jpg', 'back.thumb.jpg'],
    imageUrls: ['front.jpg', 'back.jpg'],
    redemptionMethod: 'In store pickup; $10 Redemption Fee',
    watchUrl: 'http://eepurl.com/dOV-YD',
  }),
  new Token({
    id: 1,
    name: 'Beta Mox Jet (BGS 9.0)',
    description: 'A BGS graded 9.0 (9/9/9/8.5) Unlimited Mox Jet. BGS #0010945394.',
    sunsetLength: '90 Days',
    thumbUrls: ['front.thumb.jpg', 'back.thumb.jpg'],
    imageUrls: ['front.jpg', 'back.jpg'],
    redemptionMethod: 'In store pickup; $10 Redemption Fee',
    watchUrl: 'http://eepurl.com/dPaMPj',
  }),
  new Token({
    id: 2,
    name: 'Beta Mox Pearl (BGS 8.5)',
    description: 'A BGS graded 8.5 (8/9/9/9.5) Beta Mox Pearl. BGS #0010945395.',
    sunsetLength: '90 Days',
    thumbUrls: ['front.thumb.jpg', 'back.thumb.jpg'],
    imageUrls: ['front.jpg', 'back.jpg'],
    redemptionMethod: 'In store pickup; $10 Redemption Fee',
    watchUrl: 'http://eepurl.com/dPaNnz',
  })
]


app.directive('tokens', function () {
  return {
    templateUrl: './templates/tokens.html',
    link: ($scope) => {
      $scope.tokens = tokens
    }
  }
})

app.directive('token', function (modal) {
  return {
    scope: {
      token: '='
    },
    templateUrl: './templates/token.html',
    link: function ($scope) {
      $scope.openSunsetExplainer = () => {
        modal.open('Sunsets', 'Once a sunset period has been initiated, token holders will have 90 days to redeem the asset. Tokens remain tradeable between the start and end of a sunset period. You can get email alerts for sunsets by clicking the "Watch" button.')
      }
    }
  }
})

app.directive('tokenButtons', function () {
  return {
    scope: {
      token: '=tokenButtons'
    },
    templateUrl: './templates/token-buttons.html',
    link: function ($scope) {
      $scope.buy = function($event) {
        if (confirm('You are now being directed to OpenSea, a third party exchange not affiliated with GuildCrypt.')) {
          window.open($scope.token.buyUrl)
        }
      }
    }
  }
})

app.directive('images', function () {
  return {
    scope: {
      thumbUrls: '=thumbUrls',
      imageUrls: '=imageUrls'
    },
    templateUrl: './templates/images.html',
    link: function ($scope) {
      $scope.index = 0
    }
  }
})

app.service('modal', function ($uibModal) {
  this.open = function(title, body) {
    console.log(title, body)
    const modal = $uibModal.open({
      templateUrl: './templates/modal.html',
      size: 'lg',
      controller: function($scope) {
        $scope.title =  title
        $scope.body = body
        $scope.close = () => {
          modal.close()
        }
      }
    })
    return modal
  }
})
