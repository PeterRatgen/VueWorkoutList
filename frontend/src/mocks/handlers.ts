import { rest } from 'msw';

import { token, testData } from '../../tests/testData';

const baseURL = "http://localhost";

export const handlers = [
    rest.post(baseURL + '/login', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.text( 
                token
            )
        );
    }),
    rest.post(baseURL + '/workout_history', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                 "fdajidjf23lklviu"
            )
        );
    }),
    rest.get(baseURL + '/workout', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                testData 
            )
        );
    }),
];
