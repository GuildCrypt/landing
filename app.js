const app = angular.module('app', ['ui.bootstrap'])
const contractAddressHex = 'a307b905140c82b37f2d7d806ef9d8858d30ac87'

function Tokenizer(data) {
  this.data = data
}

const pat = new Tokenizer({
  name: 'Pat Liu',
  info: 'Pat Liu is a L1 Judge based in central NJ, where he spends his time judging FNMs at his LGS.  His favorite format is EDH, where he has 17/32 color combinations complete.  He has recently been dabbling in Legacy and Modern as well.',
  imageUrl: './assets/pat.jpg',
  email: 'liupat1017@gmail.com'
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
    thumbUrls: ['front.thumb.png', 'back.thumb.png'],
    imageUrls: ['front.png', 'back.png'],
    redemptionMethod: 'In store pickup; $10 Redemption Fee',
    watchUrl: 'http://eepurl.com/dOV-YD',
  }),
  new Token({
    id: 1,
    name: 'Beta Mox Jet (BGS 9.0)',
    description: 'A BGS graded 9.0 (9/9/9/8.5) Unlimited Mox Jet. BGS #0010945394.',
    sunsetLength: '90 Days',
    thumbUrls: ['front.thumb.png', 'back.thumb.png'],
    imageUrls: ['front.png', 'back.png'],
    redemptionMethod: 'In store pickup; $10 Redemption Fee',
    watchUrl: 'http://eepurl.com/dPaMPj',
  }),
  new Token({
    id: 2,
    name: 'Beta Mox Pearl (BGS 8.5)',
    description: 'A BGS graded 8.5 (8/9/9/9.5) Beta Mox Pearl. BGS #0010945395.',
    sunsetLength: '90 Days',
    thumbUrls: ['front.thumb.png', 'back.thumb.png'],
    imageUrls: ['front.png', 'back.png'],
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

app.directive('token', function ($uibModal) {
  return {
    scope: {
      token: '='
    },
    templateUrl: './templates/token.html',
    link: function ($scope) {
      const token = $scope.token
      $scope.openSunsetInfoModal = () => {
        console.log('open')
        const modalInstance = $uibModal.open({
          templateUrl: './templates/modals/sunset-info.html',
          size: 'md',
          controller: function($scope) {
            $scope.close = () => {
              modalInstance.close()
            }
          }
        })
      }
      $scope.openTokenizerModal = () => {
        const modalInstance = $uibModal.open({
          templateUrl: './templates/modals/tokenizer.html',
          size: 'md',
          controller: function($scope) {
            $scope.tokenizer = token.tokenizer
            $scope.close = () => {
              modalInstance.close()
            }
          }
        })
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
