#include <string>
#include <vector>
#include <algorithm>
#include <unordered_map>

using namespace std;

vector<int> solution(vector<string> words, vector<string> queries) {
    vector<int> answer;
    unordered_map<int, vector<string>> normal;
    unordered_map<int, vector<string>> reversed;

    for (string word : words) {
        int len = word.size();
        normal[len].push_back(word);

        reverse(word.begin(), word.end());
        reversed[len].push_back(word);
    }

    for (auto& item : normal) {
        sort(item.second.begin(), item.second.end());
    }

    for (auto& item : reversed) {
        sort(item.second.begin(), item.second.end());
    }

    for (string query : queries) {
        int len = query.size();

        if (query[0] != '?') {
            string left = query;
            string right = query;

            for (char& c : left) {
                if (c == '?') c = 'a';
            }

            for (char& c : right) {
                if (c == '?') c = 'z';
            }

            auto& arr = normal[len];

            int count = upper_bound(arr.begin(), arr.end(), right)
                      - lower_bound(arr.begin(), arr.end(), left);

            answer.push_back(count);
        } else {
            reverse(query.begin(), query.end());

            string left = query;
            string right = query;

            for (char& c : left) {
                if (c == '?') c = 'a';
            }

            for (char& c : right) {
                if (c == '?') c = 'z';
            }

            auto& arr = reversed[len];

            int count = upper_bound(arr.begin(), arr.end(), right)
                      - lower_bound(arr.begin(), arr.end(), left);

            answer.push_back(count);
        }
    }

    return answer;
}