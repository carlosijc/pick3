import pool from './connection';
import { ResultSetHeader } from 'mysql2';

// 
//select
export async function SelectQuery<T>(queryString: string, params?: any[]): Promise<Partial<T>[]> {
    const [results] = await pool.execute(queryString, params);
    return results as T[];
}
//insert, update, delete
export async function ModifyQuery(queryString: string, params?: any[]): Promise<ResultSetHeader> {
    const [results] = await pool.execute(queryString, params);
    return results as ResultSetHeader;
}
