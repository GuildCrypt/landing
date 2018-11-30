const app = angular.module('app', ['ui.bootstrap'])

function Tokenizer(data) {
  this.data = data
}

const tokenizers = [
  new Tokenizer({
    address: '0xPAT_LIU',
    name: 'Pat Liu',
    info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  })
]

function Token(data) {
  this.data = data
  this.tokenizer = _.find(tokenizers, (tokenizer) => {
    return tokenizer.data.address == data.tokenizerAddress
  })
  this.imageUrls = this.data.imageUrls.map((imageUrl) => {
    return `./assets/images/${this.data.id}/${imageUrl}`
  })
  this.buyUrl = 'https://opensea.io/'
  this.redeemUrl = `https://redeem.guildcrypt.com/#${this.data.id}`
  this.termsUrl = `./assets/terms/${this.data.id}.pdf`
}

const tokens = [
  new Token({
    id: 0,
    name: 'Black Lotus',
    description: 'Becket Graded 9.5 Black Lotus',
    tokenizerAddress: '0xPAT_LIU',
    sunsetPeriod: '90 Days',
    address: '0xaddress',
    imageUrls: ['front.jpg', 'back.jpg'],
    redemptionMethod: 'In store pickup; $10 Redemption Fee',
    legal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    watchUrl: 'http://eepurl.com/dOV-YD'
  }),
  new Token({
    id: 1,
    name: 'Mox Jet',
    description: 'Becket Graded 9.5 Mox Jet',
    tokenizerAddress: '0xPAT_LIU',
    sunsetPeriod: '90 Days',
    address: '0xaddress',
    imageUrls: ['front.jpg', 'back.jpg'],
    redemptionMethod: 'In store pickup; $10 Redemption Fee',
    legal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    watchUrl: 'http://eepurl.com/dPaMPj'
  }),
  new Token({
    id: 2,
    name: 'Ancestral Recall',
    description: 'Becket Graded 9.5 Ancestral Recall',
    tokenizerAddress: '0xPAT_LIU',
    sunsetPeriod: '90 Days',
    address: '0xaddress',
    imageUrls: ['front.jpg', 'back.jpg'],
    redemptionMethod: 'In store pickup; $10 Redemption Fee',
    legal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    watchUrl: 'http://eepurl.com/dPaNnz'
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

      $scope.openTokenizerModal = () => {
        modal.open($scope.token.tokenizer.data.name, $scope.token.tokenizer.data.info)
      }

      $scope.openTokenLegalModal = () => {
        modal.open(`${$scope.token.data.name} - Terms and Conditions`, $scope.token.data.legal)
      }

      $scope.startRedemption = () => {
        getWeb3().then((web3) => {
          alert('web3')
        })
      }
      $scope.watch = () => {
        modal.open(`${$scope.token.data.name} - Watch`, $scope.token.data.legal)
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
  }
})

app.directive('images', function () {
  return {
    scope: {
      imageUrls: '=images'
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
