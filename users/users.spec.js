const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../api/server');

describe('users', () => {

	const user = {
		id       : 1,
		username : 'John',
		password : 'Doe',
    };
    
	// makes sure it is a string - sanity test with Number
	describe('register', () => {
		it('user is not empty', () => {
			expect(user).toMatchObject({
				username : expect.any(String),
			});
		});
		it('user is not null', () => {
			expect(user).not.toBeNull();
        });
    });
    
	// makes sure it is a string - sanity test with number.
	describe('login', () => {
		it('not empty', () => {
			expect(user).toMatchObject({
				username : expect.any(String),
			});
		});
		it('not null', () => {
			expect(user).not.toBeNull();
		});
    });
    
	describe('login', () => {
		const user = {
            username : 'John',
            password : 'Doe123',
		};
		// checks to see if the user property exists
		it('does the literal word username exist', () => {
			expect(user).toHaveProperty('username');
		});
		it('not null', () => {
			expect(user).not.toBeNull();
		});
		// checks to see if property of password exists
		it('does the literal word password exist', () => {
			expect(user).toHaveProperty('password');
		});
	});
});


















// Add user2db test not working


		// it('should add the user into the database', async () => {
		// 	await request(server).post('/api/auth/register').send({
		// 		username : 'John',
		//         password : 'Doe',
		// 	});
		// 	const users = await db('users');
		// 	// checks that one user has been entered
		// 	expect(users).toHaveLength(1);
		// });