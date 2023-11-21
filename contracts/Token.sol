pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }
}

// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract Token is IERC20, Ownable {
//     using SafeMath for uint256;

//     // Token details
//     string private _name = "MyToken";
//     string private _symbol = "MTK";
//     uint8 private _decimals = 18;
//     uint256 private _totalSupply;

//     // Balances and allowances
//     mapping(address => uint256) private _balances;
//     mapping(address => mapping(address => uint256)) private _allowances;

//     // Events
//     event Transfer(address indexed from, address indexed to, uint256 value);
//     event Approval(address indexed owner, address indexed spender, uint256 value);

//     // Constructor
//     constructor(uint256 initialSupply) {
//         _totalSupply = initialSupply * 10**_decimals;
//         _balances[msg.sender] = _totalSupply;
//         emit Transfer(address(0), msg.sender, _totalSupply);
//     }

//     // ERC-20 functions

//     function name() public view override returns (string memory) {
//         return _name;
//     }

//     function symbol() public view override returns (string memory) {
//         return _symbol;
//     }

//     function decimals() public view override returns (uint8) {
//         return _decimals;
//     }

//     function totalSupply() public view override returns (uint256) {
//         return _totalSupply;
//     }

//     function balanceOf(address account) public view override returns (uint256) {
//         return _balances[account];
//     }

//     function transfer(address to, uint256 value) public override returns (bool) {
//         _transfer(msg.sender, to, value);
//         return true;
//     }

//     function allowance(address owner, address spender) public view override returns (uint256) {
//         return _allowances[owner][spender];
//     }

//     function approve(address spender, uint256 value) public override returns (bool) {
//         _approve(msg.sender, spender, value);
//         return true;
//     }

//     function transferFrom(address from, address to, uint256 value) public override returns (bool) {
//         _transfer(from, to, value);
//         _approve(from, msg.sender, _allowances[from][msg.sender].sub(value, "ERC20: transfer amount exceeds allowance"));
//         return true;
//     }

//     // Internal functions

//     function _transfer(address from, address to, uint256 value) internal {
//         require(from != address(0), "ERC20: transfer from the zero address");
//         require(to != address(0), "ERC20: transfer to the zero address");
//         require(_balances[from] >= value, "ERC20: transfer amount exceeds balance");

//         _balances[from] = _balances[from].sub(value);
//         _balances[to] = _balances[to].add(value);

//         emit Transfer(from, to, value);
//     }

//     function _approve(address owner, address spender, uint256 value) internal {
//         require(owner != address(0), "ERC20: approve from the zero address");
//         require(spender != address(0), "ERC20: approve to the zero address");

//         _allowances[owner][spender] = value;
//         emit Approval(owner, spender, value);
//     }
// }
