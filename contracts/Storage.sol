pragma solidity 0.8.9;

contract Storage {
    mapping(string => uint256) _uintStorage;
    mapping(string => address) _addressStorage;
    mapping(string => bool) _boolStorage;
    mapping(string => bytes4) _bytesStorage;
    mapping(string => string) _stringStorage;
    address public owner;
    bool public _initialized;
}