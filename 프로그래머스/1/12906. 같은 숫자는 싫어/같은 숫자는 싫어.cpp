#include <vector>
using namespace std;

vector<int> solution(vector<int> arr) {
    vector<int> ans;
    ans.reserve(arr.size());

    int prev = -1;
    for (int x : arr) {
        if (x != prev) {
            ans.push_back(x);
            prev = x;
        }
    }
    return ans;
}